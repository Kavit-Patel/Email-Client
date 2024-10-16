import { EmailItem } from "@/types/types";

const Avatar = ({ email }: { email: EmailItem }) => {
  return (
    <div className="w-12 h-12 rounded-full bg-[#E54065] flex justify-center items-center text-2xl text-white font-semibold">
      {email.from.name.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;
