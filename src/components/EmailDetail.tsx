"use client";
import { useEmailDetail } from "@/app/hooks/useEmailQueries";
import { EmailItem } from "@/types/types";
import parse from "html-react-parser";
import Avatar from "./Avatar";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const EmailDetail = ({
  email,
  updateEmailStatus,
}: {
  email: EmailItem;
  updateEmailStatus: (id: string, updates: Partial<EmailItem>) => void;
}) => {
  const { data, isLoading, isError } = useEmailDetail(email.id);
  const [isFavorite, setIsFavorite] = useState(email.isFavorite);

  useEffect(() => {
    setIsFavorite(email.isFavorite);
  }, [email]);

  const handleToggleFavorite = () => {
    updateEmailStatus(email.id, { isFavorite: !isFavorite });
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className=" w-full flex justify-center items-center">
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {isError && (
        <div className="w-full h-full flex justify-center items-center text-red-600 font-semibold">
          Failed to load email content.
        </div>
      )}
      {!isLoading && !isError && data && (
        <div className="flex gap-5">
          <div className="min-w-14">
            <Avatar email={email} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">{email.subject}</h1>
              <button
                onClick={handleToggleFavorite}
                className="bg-[#E54065] w-44 text-center px-4 py-1 text-white rounded-2xl text-xs transition-all active:scale-95"
              >
                {isFavorite ? "Remove From Favorite" : "Mark as Favorite"}
              </button>
            </div>
            <div>{format(new Date(email.date), "dd/MM/yyyy hh:mm a")}</div>
            <div className="overflow-y-auto custom-scrollbar">
              {data && parse(data.body)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailDetail;
