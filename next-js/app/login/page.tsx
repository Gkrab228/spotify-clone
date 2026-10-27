import SpotifyLogo from "@/app/ui/login/SpotifyLogo";
import SocialLoginButtons from "@/app/ui/login/SocialLoginButtons";
import LoginForm from "@/app/ui/login/LoginForm";
import LoginDivider from "@/app/ui/login/LoginDivider";
import LoginFooter from "@/app/ui/login/LoginFooter";

export default function LoginPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black text-white flex flex-col items-center">
      {/* Top Header with Spotify Logo */}
      <header className="w-full py-8 px-6 flex justify-center items-center">
        <SpotifyLogo size="lg" />
      </header>

      {/* Main Container Card */}
      <main className="w-full flex-1 flex justify-center items-start sm:items-center px-4 pb-12">
        <div className="w-full max-w-[734px] bg-transparent sm:bg-[#121212] rounded-lg px-4 py-6 sm:px-14 sm:py-12 flex flex-col items-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-center mb-2">
            Log in to Spotify
          </h1>

          {/* Centered Form & Actions Column */}
          <div className="w-full max-w-[324px] flex flex-col items-center">
            {/* <SocialLoginButtons /> */}
            <LoginDivider />
            <LoginForm />
            <LoginDivider />
            <LoginFooter />
          </div>
        </div>
      </main>
    </div>
  );
}