import type { propertyPhotos } from "@/lib/property";
import ReadMore from "@/components/ui/ReadMore";
import { TextLink } from "@/components/ui/Editorial";

export type StoryParagraph = { readonly text: string; readonly kind: string };
export type ChapterContent = {
  readonly id: string;
  readonly heading: string;
  readonly media: keyof typeof propertyPhotos;
  readonly paragraphs: readonly StoryParagraph[];
  /** Optional extra detail, revealed with "Read more". */
  readonly more?: readonly StoryParagraph[];
  /** Optional link to an existing page for readers who want more depth. */
  readonly link?: { readonly href: string; readonly label: string };
};

export function StoryQuote({ text, className = "" }: { text: string; className?: string }) {
  return <blockquote className={`education-quote ${className}`}><p>{text}</p></blockquote>;
}
function renderParagraphs(paragraphs: readonly StoryParagraph[]) {
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
  return groups;
}
export function StoryParagraphs({
  paragraphs,
  more,
  link,
}: {
  paragraphs: readonly StoryParagraph[];
  more?: readonly StoryParagraph[];
  link?: { readonly href: string; readonly label: string };
}) {
  return (
    <div className="education-prose">
      {renderParagraphs(paragraphs)}
      {more && more.length > 0 && <ReadMore>{renderParagraphs(more)}</ReadMore>}
      {link && <p className="education-more-link"><TextLink href={link.href}>{link.label}</TextLink></p>}
    </div>
  );
}
