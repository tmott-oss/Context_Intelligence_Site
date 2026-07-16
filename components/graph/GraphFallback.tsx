export function GraphFallback({ message = "Organizational intelligence connects people, conversations, decisions, processes, systems, documents, and outcomes." }: { message?: string }) {
  return (
    <div className="graph-fallback" role="img" aria-label={message}>
      <div className="graph-fallback__rings" aria-hidden="true">
        {Array.from({ length: 15 }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
      <p>{message}</p>
    </div>
  );
}
