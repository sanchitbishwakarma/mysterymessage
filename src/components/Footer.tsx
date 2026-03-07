import { Facebook, Github, Instagram, Linkedin, Twitter, LucideIcon, } from "lucide-react";
import Link from "next/link";

export interface SocialMediaLinks {
  title: string;
  link: string;
  icon: LucideIcon;
}

const socialMediaLinks: Array<SocialMediaLinks> = [
  {
    title: "Facebook",
    link: "https://facebook.com/sanchitdotai",
    icon: Facebook,
  },
  {
    title: "Twiiter",
    link: "https://x.com/sanchitdotai",
    icon: Twitter,
  },
  {
    title: "GitHub",
    link: "https://github.com/sanchitdotai",
    icon: Github,
  },
  {
    title: "LinkedIn",
    link: "https://linkedin.com/in/sanchitdotai",
    icon: Linkedin,
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-sm text-gray-400">
          © {currentYear} Mystery Message. All rights reserved.
        </span>
        <div className="flex gap-4">
          {socialMediaLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
              key={index}
                href={link.link}
                title={`Folllow me on ${link.title}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${link.title}`}
              >
                <Icon
                  size={20}
                  className="text-gray-400 hover:text-white transition-colors"
                />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
