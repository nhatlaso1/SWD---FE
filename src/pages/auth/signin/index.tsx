import UserAuthForm from './components/user-auth-form';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function SignInPage() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r  lg:flex">
        <div className="absolute inset-0 bg-secondary" />
        <div className="relative z-20 flex items-center text-lg font-medium text-current">
          Invetory
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-current">
              Hệ thống quản trị - Inventory
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Đăng nhập</h1>
            <p className="text-sm text-muted-foreground">
              Nhập tài khoản của bạn để tiếp tục
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <a className="underline underline-offset-4 hover:text-primary">
              điều khoản dịch vụ
            </a>{' '}
            và{' '}
            <a className="underline underline-offset-4 hover:text-primary">
              chính sách bảo mật của chúng tôi
            </a>{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
