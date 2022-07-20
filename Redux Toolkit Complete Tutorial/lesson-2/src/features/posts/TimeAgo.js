import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
//Biz, Postlist te gostercegimiz icin tarihi, bize ordan timestamp propsu gelecek
const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp); //string den alip, hangi data tipinden stringe cevrilmis ise ona ceviriyor
    //Tue Jul 19 2022 22:01:30 GMT+0200 (sentraleuropeisk sommertid)
    const timePeriod = formatDistanceToNow(date);
    //Burda da detayli tarih formatinda,
    //icinde saat,dakika vs de olacak, o formattaki tarihi aliyor su anki tarihe gore ne kadar zaman gecmis ise onu getirir
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
