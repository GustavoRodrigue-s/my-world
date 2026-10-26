/** The content under a page's opening plate: same gutters, no second top padding. */
export function PageBody({ narrow, children }: { narrow?: boolean; children: React.ReactNode }) {
  return (
    <div className="px-gutter md:px-gutter-wide pb-block md:pb-block-wide">
      <div className={narrow ? 'article-inner' : 'section-inner'}>{children}</div>
    </div>
  )
}
