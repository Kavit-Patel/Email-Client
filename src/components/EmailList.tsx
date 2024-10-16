import EmailItemComponent from "./EmailItem";
import { EmailItem } from "@/types/types";

const EmailList = ({
  selectedEmail,
  setSelectedEmail,
  data,
}: {
  selectedEmail: EmailItem | undefined;
  setSelectedEmail: (email: EmailItem) => void;
  data: { list: EmailItem[]; total?: number | undefined };
}) => {
  return (
    <div className="w-full">
      <ul className="">
        {data?.list?.map((email: EmailItem) => (
          <li
            key={email.id}
            className={`p-4 m-2 rounded-lg border  cursor-pointer ${
              email.isRead ? "bg-[#F2F2F2]" : "bg-white"
            } ${
              email.id === selectedEmail?.id
                ? "border-[#E54065]"
                : "border-[#CFD2DC]"
            }`}
            onClick={() => setSelectedEmail(email)}
          >
            <EmailItemComponent key={email.id} email={email} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
