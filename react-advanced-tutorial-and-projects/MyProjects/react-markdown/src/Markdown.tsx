import { useState } from "react";
import ReactMarkdown from "react-markdown";

const Markdown = () => {
    const [markdown,setMarkdown]=useState<string>("#  markdown preview");
  return (
    <main>
    <section className="markdown">
        <textarea
        className="input"
        value={markdown}
        onChange={(e)=>setMarkdown(e.target.value)}
        >
        </textarea>
        <article className="result">
        <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
    </section>
    </main> 
  )
}

export default Markdown