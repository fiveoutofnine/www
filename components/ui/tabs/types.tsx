import * as TabsPrimitive from '@radix-ui/react-tabs';

// ---------------------------------------–-------------------------------------
// Component props
// ---------------------------------------–-------------------------------------

export type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>;

export type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>;

export type TabsRootProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>;

export type TabsTriggerProps =
  | (Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'asChild'> & {
      asChild?: false;
    } & {
      icon?: React.ReactNode;
      stat?: number;
      href?: string;
      newTab?: boolean;
    })
  | (Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>, 'asChild'> & {
      asChild: true;
    });

// ---------------------------------------–-------------------------------------
// Composition
// ---------------------------------------–-------------------------------------

export type TabsComposition = {
  Content: React.FC<TabsContentProps>;
  List: React.FC<TabsListProps>;
  Root: React.FC<TabsRootProps>;
  Trigger: React.FC<TabsTriggerProps>;
};
