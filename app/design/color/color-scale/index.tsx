import ColorScaleSample from './sample';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const radixColors = require('@radix-ui/colors');

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ColorScaleProps = {
  scale: keyof typeof radixColors;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ColorScale: React.FC<ColorScaleProps> = ({ scale }) => {
  const colors = Object.entries(radixColors[scale]);

  return (
    <div className="flex -space-x-px">
      {colors.map((color, index) => (
        <ColorScaleSample key={index} scale={scale} index={index} color={String(color[1])} />
      ))}
    </div>
  );
};

export default ColorScale;
