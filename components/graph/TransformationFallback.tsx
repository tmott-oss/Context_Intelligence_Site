import { transformationStages } from "./transformationData";

export function TransformationFallback({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`transformation-fallback${compact ? " transformation-fallback--compact" : ""}`} role="img" aria-label="Seven business systems progressing from vision through scale as one coordinated AI transformation architecture">
      <div className="transformation-fallback__path" aria-hidden="true">
        {transformationStages.map((stage, index) => (
          <div key={stage.key} style={{ "--stage": stage.color, "--i": index } as React.CSSProperties}>
            <i />
            {!compact && <span>{stage.label}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
