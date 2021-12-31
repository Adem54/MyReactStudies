import React from "react";
import YorumListesi from "./YorumListesi";
import YorumFormu from "./YorumFormu";

function YaziYorumlari(props) {


  return (
    <React.Fragment>
      <YorumListesi comments={props.comments} />
      <YorumFormu handleSubmit={props.handleSubmit}  />
    </React.Fragment>
  );
}

export default YaziYorumlari;
