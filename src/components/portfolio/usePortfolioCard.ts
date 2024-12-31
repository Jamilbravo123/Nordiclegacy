interface UsePortfolioCardProps {
  website: string;
}

export function usePortfolioCard({ website }: UsePortfolioCardProps) {
  const handleLearnMore = () => {
    if (website) {
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  };

  return {
    handleLearnMore,
  };
}