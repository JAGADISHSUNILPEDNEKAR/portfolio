'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ArrowTopRightOnSquareIcon 
} from '@heroicons/react/24/outline';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';

// Social Media Icon Components
const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const DribbbleIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.372 0 12s5.374 12 12 12 12-5.372 12-12S18.626 0 12 0zm9.568 7.375c.53 1.104.846 2.321.846 3.611 0 .469-.041.927-.12 1.378-.274-.063-.6-.11-.979-.14-.909-.073-1.857-.052-2.829.063-.364-1.457-.819-2.637-1.362-3.536 1.691-.892 3.028-1.376 3.444-1.376zm-2.454 1.201c-.469.252-1.248.573-2.454 1.012.819 1.207 1.425 2.606 1.816 4.197.273-.069.525-.142.761-.216.364-.114.689-.227.978-.341-.151-1.678-.678-3.201-1.101-4.652zM12 2.25c2.187 0 4.175.75 5.765 2.009-.151.151-.417.417-.853.853-.628.628-1.319 1.319-2.025 1.851C13.5 5.25 12 3.75 12 2.25zm-6.75 4.5c.75-.75 1.5-1.5 2.25-2.25C8.25 5.25 9 6 9.75 6.75s1.5 1.5 2.25 2.25c-.75.75-1.5 1.5-2.25 2.25s-1.5 1.5-2.25 2.25-1.5 1.5-2.25 2.25S6 17.25 6 18s.75 1.5 1.5 1.5 1.5-.75 1.5-1.5-.75-1.5-1.5-1.5zm0 13.5c-2.187 0-4.175-.75-5.765-2.009.151-.151.417-.417.853-.853.628-.628 1.319-1.319 2.025-1.851C1.5 18.75 3 20.25 3 21.75zm6.75-4.5c-.75.75-1.5 1.5-2.25 2.25-.75-.75-1.5-1.5-2.25-2.25s-1.5-1.5-2.25-2.25 1.5-1.5 2.25-2.25 1.5-1.5 2.25-2.25 1.5-1.5 2.25-2.25-.75 1.5-1.5 2.25zm6 4.5c.75-.75 1.5-1.5 2.25-2.25.75.75 1.5 1.5 2.25 2.25s1.5 1.5 2.25 2.25-1.5 1.5-2.25 2.25-1.5 1.5-2.25 2.25-1.5 1.5-2.25 2.25.75-1.5 1.5-2.25z"/>
  </svg>
);

const BehanceIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M0 7.5v9c0 .825.675 1.5 1.5 1.5h21c.825 0 1.5-.675 1.5-1.5v-9c0-.825-.675-1.5-1.5-1.5h-21c-.825 0-1.5.675-1.5 1.5zm22.5 0v9h-21v-9h21zm-20.25 1.5v6h3.75c1.238 0 2.25-1.013 2.25-2.25s-1.012-2.25-2.25-2.25h-1.5v-1.5h-2.25zm1.5 1.5h1.5c.412 0 .75.338.75.75s-.338.75-.75.75h-1.5v-1.5zm6.75-1.5v6h4.5c1.238 0 2.25-1.013 2.25-2.25 0-.825-.45-1.575-1.125-1.95.675-.375 1.125-1.125 1.125-1.95 0-1.238-1.012-2.25-2.25-2.25h-4.5zm1.5 1.5h2.25c.412 0 .75.338.75.75s-.338.75-.75.75h-2.25v-1.5zm0 3h2.25c.412 0 .75.338.75.75s-.338.75-.75.75h-2.25v-1.5zm6.75-4.5h3v1.5h-3v-1.5z"/>
  </svg>
);

// Function to get the appropriate icon for each social platform
const getSocialIcon = (platform) => {
  const iconProps = { className: "w-5 h-5 group-hover:scale-110 transition-transform duration-200" };
  
  switch (platform.toLowerCase()) {
    case 'github':
      return <GitHubIcon {...iconProps} />;
    case 'linkedin':
      return <LinkedInIcon {...iconProps} />;
    case 'twitter':
      return <TwitterIcon {...iconProps} />;
    case 'instagram':
      return <InstagramIcon {...iconProps} />;
    case 'dribbble':
      return <DribbbleIcon {...iconProps} />;
    case 'behance':
      return <BehanceIcon {...iconProps} />;
    default:
      return <ArrowTopRightOnSquareIcon {...iconProps} />;
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Web Development', href: '#' },
        { name: 'UI/UX Design', href: '#' },
        { name: 'Consulting', href: '#' },
        { name: 'Code Review', href: '#' }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      label: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`
    },
    {
      icon: PhoneIcon,
      label: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone}`
    },
    {
      icon: MapPinIcon,
      label: PERSONAL_INFO.location,
      href: null
    }
  ];

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                {PERSONAL_INFO.name}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Creative developer passionate about building exceptional digital experiences with modern technologies.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <Link
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group"
                  aria-label={`${platform} profile`}
                >
                  {getSocialIcon(platform)}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Quick Links & Services */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 1) * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                    >
                      {link.name}
                      <ArrowTopRightOnSquareIcon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white mb-6">Get In Touch</h4>
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-400">{item.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-medium text-white hover:scale-105 transition-transform duration-200"
              >
                Start a Project
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} {PERSONAL_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;