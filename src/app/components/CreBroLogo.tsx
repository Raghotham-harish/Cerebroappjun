import logoFull from "figma:asset/45a812eac27043360e0c7fda5d53b752297eecc4.png";
import logoIcon from "figma:asset/c504c5f89bc0771aad4c3ef889995589effa17f8.png";

interface CreBroLogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "icon";
}

export function CreBroLogo({ size = 60, className = "", variant = "icon" }: CreBroLogoProps) {
  const logoSrc = variant === "full" ? logoFull : logoIcon;
  
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <img 
        src={logoSrc} 
        alt="CereBro Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
