'use client';

import { Footprints, Keyboard } from 'lucide-react';

import { Button, Command, Dialog, Drawer } from '@/components/ui';
import CodeBlockLanguageLogo from '@/components/ui/code-block/language-logo';

export default function Page() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Open</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
            hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
          </Dialog.Description>
          <Dialog.Footer>
            <Dialog.Close asChild>
              <Button variant="secondary" intent="none" type="button">
                Cancel
              </Button>
            </Dialog.Close>
            <Button variant="secondary" intent="success" type="button">
              Yes, send anyway
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button>Open</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <Drawer.Title>Title</Drawer.Title>
          <Drawer.Description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar risus non risus
            hendrerit venenatis. Pellentesque sit amet hendrerit risus, sed porttitor quam.
          </Drawer.Description>
          <Drawer.Footer>
            <Drawer.Close asChild>
              <Button variant="secondary" intent="none" type="button">
                Cancel
              </Button>
            </Drawer.Close>
            <Button variant="secondary" intent="success" type="button">
              Yes, send anyway
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>
      <Command.Root className="max-w-lg">
        <Command.Input placeholder="Type to search" />
        <Command.List>
          <Command.Empty>breh.</Command.Empty>
          <Command.Group heading="Mog sudolabel in...">
            <Command.Item icon={<Keyboard />}>Typing</Command.Item>
            <Command.Item icon={<Footprints />}>5000m</Command.Item>
            <Command.Item icon={<Footprints />}>Half marathon</Command.Item>
            <Command.Item icon={<CodeBlockLanguageLogo.Solidity />}>Solidity</Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Mog sudolabel on...">
            <Command.Item>X (formerly known as Twitter)</Command.Item>
            <Command.Item>Stanford Law School</Command.Item>
            <Command.Item disabled>16 paloma</Command.Item>
          </Command.Group>
        </Command.List>
      </Command.Root>
    </div>
  );
}
