import { useProductContentBlocks, ContentBlock } from '@/hooks/useProductContentBlocks';
import { SpecsListBlock } from './blocks/SpecsListBlock';
import { ImageGalleryBlock } from './blocks/ImageGalleryBlock';
import { TechnicalDiagramBlock } from './blocks/TechnicalDiagramBlock';
import { CtaTilesBlock } from './blocks/CtaTilesBlock';
import { VariantsCarouselBlock } from './blocks/VariantsCarouselBlock';
import { TextWithImageBlock } from './blocks/TextWithImageBlock';
import { ContactCtaBlock } from './blocks/ContactCtaBlock';
import { FaqListBlock } from './blocks/FaqListBlock';
import { RichTextBlock } from './blocks/RichTextBlock';

interface Props {
  productId: string;
  categoryId: string | null;
}

function renderBlock(block: ContentBlock) {
  switch (block.block_type) {
    case 'specs_list':         return <SpecsListBlock block={block} />;
    case 'image_gallery':      return <ImageGalleryBlock block={block} />;
    case 'technical_diagram':  return <TechnicalDiagramBlock block={block} />;
    case 'cta_tiles':          return <CtaTilesBlock block={block} />;
    case 'variants_carousel':  return <VariantsCarouselBlock block={block} />;
    case 'text_with_image':    return <TextWithImageBlock block={block} />;
    case 'contact_cta':        return <ContactCtaBlock block={block} />;
    case 'faq_list':           return <FaqListBlock block={block} />;
    case 'rich_text':          return <RichTextBlock block={block} />;
    default:                   return null;
  }
}

export function ProductContentBlocks({ productId, categoryId }: Props) {
  const { data: blocks } = useProductContentBlocks(productId, categoryId);
  if (!blocks || blocks.length === 0) return null;
  return (
    <>
      {blocks.map(block => (
        <div key={block.id}>{renderBlock(block)}</div>
      ))}
    </>
  );
}
