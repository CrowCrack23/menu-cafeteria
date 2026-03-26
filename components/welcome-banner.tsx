interface WelcomeBannerProps {
  message: string;
  subtitle: string;
}

export function WelcomeBanner({ message, subtitle }: WelcomeBannerProps) {
  return (
    <div className="text-center px-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
        {message}
      </h1>
      <p className="text-muted-foreground text-sm">
        {subtitle}
      </p>
    </div>
  );
}
