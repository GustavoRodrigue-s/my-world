/** The content under a page's opening plate: same gutters, no second top padding. */
export function PageBody({ narrow, children }: { narrow?: boolean; children: React.ReactNode }) {
  return (
    <div className="px-[var(--spacing-section-x)] pb-[var(--spacing-section-y)]">
      <div className={narrow ? 'article-inner' : 'section-inner'}>{children}</div>
    </div>
  )
}
