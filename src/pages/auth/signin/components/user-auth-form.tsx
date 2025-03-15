import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import __helpers from '@/helpers';
import { useLogin } from '@/queries/auth.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Define form schema with zod
const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Tên đăng nhập phải có ít nhất 2 ký tự' }),
  password: z.string().min(2, { message: 'Mật khẩu phải có ít nhất 2 ký tự' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: login } = useLogin();

  const defaultValues = {
    username: '',
    password: ''
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const model = {
        user_name: data.username,
        password: data.password
      };
      const res = await login(model);
      console.log(res);
      if (res) {
        const token = res.token;
        __helpers.cookie_set('AT', token);

        const userDetail = await __helpers.decodeToken(token);
        __helpers.localStorage_set('role', userDetail.role);
        if (userDetail.role === 'ADMIN') {
          window.location.href = '/manager/overview';
        } else {
          window.location.href = '/manager/overview';
        }
      }
    } catch (err: any) {
      form.setError('password', {
        type: 'manual',
        message: err?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nhập tên đăng nhập..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu của bạn..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
