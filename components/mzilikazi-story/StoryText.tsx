import { storyContent } from "./content";

export type StoryParagraph = { readonly text: string; readonly kind: string };
export function StoryQuote({ text, className = "" }: { text: string; className?: string }) {
  return <blockquote className={`education-quote ${className}`}><p>{text}</p></blockquote>;
}
export function StoryParagraphs({ paragraphs }: { paragraphs: readonly StoryParagraph[] }) {
  const groups: React.ReactNode[] = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const paragraph = paragraphs[i];
    if (paragraph.kind === "question") {
      const questions: StoryParagraph[] = [];
      while (i < paragraphs.length && paragraphs[i].kind === "question") questions.push(paragraphs[i++]);
      i--;
      groups.push(<ul className="education-questions" key={paragraph.text}>{questions.map(question => <li key={question.text}>{question.text}</li>)}</ul>);
    } else if (paragraph.kind === "quote") {
      groups.push(<StoryQuote text={paragraph.text} key={paragraph.text} />);
    } else {
      groups.push(<p key={paragraph.text}>{paragraph.text}</p>);
    }
  }
  return <div className="education-prose">{groups}</div>;
}
export type ChapterContent = (typeof storyContent.chapters)[number] | (typeof storyContent.travellers)[number] | typeof storyContent.trust;
