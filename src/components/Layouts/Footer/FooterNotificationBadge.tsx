import { Badge } from '@/components/Parts/Badge/Badge';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const FooterNotificationBadge: React.FC<Props> = ({
  children,
}: Props) => {
  return (
    <Badge
      className="
        absolute
        right-[8px]
        top-[8px]
        flex
        h-[16px]
        w-[16px]
        items-center
        justify-center
        text-xxs
      "
    >
      {children}
    </Badge>
  );
};
