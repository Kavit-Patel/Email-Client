import { EmailItem } from "@/types/types";
import { format } from "date-fns";
import Avatar from "./Avatar";
import { capitalizeFirstChar } from "@/helper/FirstCapitalize";

const EmailItemComponent = ({ email }: { email: EmailItem }) => {
  return (
    <div className="w-full text-xs md:text-sm overflow-hidden custom-scrollbar">
      <div className="flex-row md:flex  gap-4">
        <div className=" w-full flex justify-center md:w-14">
          <Avatar email={email} />
        </div>
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <main className="font-semibold">
            <h3>
              <span>From: </span>
              <span className="hidden md:inline-block">
                {`${capitalizeFirstChar(email.from.email.split("@")[0])}`}{" "}
              </span>
              <span>{`<${email.from.email}>`}</span>
            </h3>
            <h3>
              <span>Subject: </span>
              {email.subject}
            </h3>
          </main>
          <p>{email.short_description}</p>
          <div className="flex items-center gap-1 lg:gap-5">
            <span>{format(new Date(email.date), "dd/MM/yyyy hh:mm a")}</span>
            <span className="text-[#E54065] font-bold">
              {email.isFavorite && "Favorite"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailItemComponent;
