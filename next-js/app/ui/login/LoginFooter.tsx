import Link from "next/link";

export default function LoginFooter() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Sign up prompt */}
      <p className="text-sm text-[#a7a7a7] text-center">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-white hover:text-[#1ed760] font-semibold underline underline-offset-2 transition-colors ml-1"
        >
          Sign up for Spotify
        </Link>
      </p>
    </div>
  );
}
