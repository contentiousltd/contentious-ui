/**
 * One of the fifteen framework criteria, scored and explained.
 * The most repeated block in the product.
 *
 * @startingPoint section="Data" subtitle="Criterion with rating, analysis and advice" viewport="700x330"
 */
export interface CriterionCardProps {
  /** The criterion name, e.g. "Error-free". */
  name: string;
  /** 1-5. */
  level: number;
  analysis: React.ReactNode;
  /** Omit when the criterion scores 5 - there is nothing to improve. */
  improve?: React.ReactNode;
  style?: React.CSSProperties;
}
export function CriterionCard(props: CriterionCardProps): JSX.Element;
