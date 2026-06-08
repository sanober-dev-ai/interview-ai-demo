"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AuthModal } from "../auth/auth-modal";
import { useRouter } from "next/dist/client/components/navigation";
import { api } from "@/app/config/api-detail";

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    setIsLoggedIn(!!token && !!userId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Resume Template", href: "#campus" },
    { name: "Cover Letter", href: "#programs" },
    { name: "FAQ", href: "#placements" },
  ];
  const handleClick = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      setAuthModalOpen(true);
      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx";

    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];

      if (!file) return;

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", userId!);

      try {
        const res = await fetch(`${api}/resume/upload`, {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Upload failed");
          return;
        }

        console.log("Upload Response:", data.resume._id);

        setJobId(data.resume._id);

        router.push("/dashboard");
      } catch (error) {
        console.error("Upload error:", error);
        alert("Something went wrong");
      }
    };

    input.click();
  };

  return (
    <>
      <nav
        className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-300
        ${
          scrolled
            ? "bg-[#07142e]/95 backdrop-blur-xl shadow-2xl border-b border-white/10"
            : "bg-transparent"
        }
      `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <p className="font-bold text-white/90 text-2xl">InterviewAI Pro</p>
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="
                  relative
                  px-4
                  py-2
                  text-[15px]
                  font-medium
                  text-white/90
                  hover:text-yellow-300
                  transition-all
                  duration-300
                  after:absolute
                  after:left-4
                  after:bottom-1
                  after:h-[2px]
                  after:w-0
                  after:bg-yellow-300
                  after:transition-all
                  after:duration-300
                  hover:after:w-[calc(100%-32px)]
                "
                >
                  {item.name}
                </Link>
              ))}
              {/* Desktop Search */}
              {showSearch ? (
                <div
                  className="
                  flex
                  items-center
                  gap-2
                  ml-2
                  bg-white/10
                  border border-white/10
                  backdrop-blur-xl
                  rounded-2xl
                  px-3
                  py-2
                "
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="
                    w-44
                    lg:w-56
                    bg-transparent
                    text-white
                    placeholder:text-gray-300
                    text-sm
                    outline-none
                  "
                  />

                  <button
                    onClick={() => setShowSearch(false)}
                    className="
                    text-white/70
                    hover:text-red-400
                    transition
                  "
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="
                  ml-2
                  w-11
                  h-11
                  rounded-xl
                  bg-white/10
                  border border-white/10
                  backdrop-blur-md
                  flex items-center justify-center
                  text-white
                  hover:bg-white/20
                  hover:text-yellow-300
                  transition-all duration-300
                "
                >
                  <Search size={19} />
                </button>
              )}
              {/* CTA */}
              <button
                className="
                ml-4
                bg-gradient-to-r
                from-yellow-300
                to-orange-300
                hover:from-yellow-200
                hover:to-orange-200
                text-black
                font-semibold
                px-6
                py-3
                rounded-2xl
                transition-all
                duration-300
                shadow-[0_10px_30px_rgba(255,200,0,0.25)]
                hover:scale-[1.03]
              "
                onClick={handleClick}
              >
                {isLoggedIn ? "Check ATS Score" : "SignIn"}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => {
                  setShowSearch(!showSearch);

                  // Close menu when search opens
                  if (!showSearch) {
                    setMobileMenuOpen(false);
                  }
                }}
                className="
                text-white
                w-10
                h-10
                rounded-xl
                bg-white/10
                border border-white/10
                backdrop-blur-md
                flex items-center justify-center
                transition-all duration-300
                hover:bg-white/20
              "
              >
                {showSearch ? <X size={20} /> : <Search size={20} />}
              </button>

              {/* Menu Toggle */}
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);

                  // Close search when menu opens
                  if (!mobileMenuOpen) {
                    setShowSearch(false);
                  }
                }}
                className="
                text-white
                w-10
                h-10
                rounded-xl
                bg-white/10
                border border-white/10
                backdrop-blur-md
                flex items-center justify-center
                transition-all duration-300
                hover:bg-white/20
              "
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {showSearch && (
            <div className="md:hidden pb-4">
              <div
                className="
                rounded-2xl
                bg-[#07142e]
                border border-white/10
                shadow-2xl
                backdrop-blur-xl
                p-2
                animate-in
                slide-in-from-top
                duration-300
              "
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="
                  w-full
                  bg-white/10
                  border border-white/10
                  text-white
                  placeholder:text-gray-300
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  outline-none
                "
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className="
              md:hidden
              mb-4
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-[#07142e]/95
              backdrop-blur-2xl
              shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              animate-in
              slide-in-from-top
              duration-300
            "
            >
              <div className="flex flex-col p-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setShowSearch(false);
                    }}
                    className="
                    text-white/90
                    text-base
                    font-medium
                    px-4
                    py-3
                    rounded-2xl
                    hover:bg-white/10
                    transition-all
                    duration-300
                  "
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile CTA */}
                <button
                  className="
                  mt-4
                  w-full
                  bg-gradient-to-r
                  from-yellow-300
                  to-orange-300
                  hover:from-yellow-200
                  hover:to-orange-200
                  text-black
                  font-semibold
                  px-5
                  py-3.5
                  rounded-2xl
                  transition-all
                  duration-300
                  shadow-lg
                "
                  onClick={handleClick}
                >
                  {isLoggedIn ? "Check ATS Score" : "SignIn"}
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
