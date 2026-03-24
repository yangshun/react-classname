type StrictProps = {
  className?: string;
};

function StrictComponent(_props: StrictProps) {
  return null;
}

const intrinsicElement = <div className={["btn", { active: true }, ["nested", 0]]} />;
const svgElement = <svg className={["icon", { visible: true }]} />;

<StrictComponent className="btn" />;
// @ts-expect-error custom component props should stay unchanged
<StrictComponent className={["btn", { active: true }]} />;
// @ts-expect-error custom component props should stay unchanged
<StrictComponent className={{ active: true }} />;

void intrinsicElement;
void svgElement;
