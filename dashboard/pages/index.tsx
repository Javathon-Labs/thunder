import React from "react";
import { Button, Link } from "@nextui-org/react";
import { FaGuilded } from "react-icons/fa";
import { NavbarCustom } from "@/components/navbar"

const Home = () => {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
        <div className="page">
          <h1 className="text-6xl font-bold mb-4">Safekeeper</h1>
          <p className="mb-8">
            A moderation bot useful for server owners to help<br />
            maintain a secured server.
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            as={Link}
            size="lg"
            showAnchorIcon
            href="https://www.guilded.gg/b/2e702266-2dfe-4796-b61c-ccbb0536444c"
            variant="solid"
            startContent={<FaGuilded color="#F5C400" />}
          >
            Invite
          </Button>
          <Button
            size="lg"
            href="https://www.guilded.gg/i/E6qrmzBp"
            as={Link}
            color="default"
            showAnchorIcon
            variant="solid"
            startContent={<FaGuilded color="#F5C400" />}
          >
            Support Server
          </Button>
        </div>
      </div>
    </>
  );
};

export default Home;