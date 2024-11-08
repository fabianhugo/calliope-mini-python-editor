/**
 * (c) 2021, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useEffect, useRef } from "react";
import ModalCloseButton from "../common/ModalCloseButton";

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
  finalFocusRef?: React.RefObject<HTMLButtonElement>;
}

/**
 * Temporary embedded Jotform for the alpha release.
 */
const FeedbackForm = ({
  isOpen,
  onClose,
  finalFocusRef = undefined,
}: FeedbackFormProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const listener = (message: MessageEvent) => {
      if (
        message.origin === "https://form.jotform.com" &&
        typeof message.data === "string"
      ) {
        const args = message.data.split(":");
        // There are many other cases in their big blob of script
        // but I think this is all we need to care about.
        if (args[0] === "setHeight" && iframeRef.current) {
          iframeRef.current.style.height = args[1] + "px";
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  });
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      finalFocusRef={finalFocusRef}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <iframe
              ref={iframeRef}
              title="Python editor feedback"
              src="https://form.jotform.com/232122009950345"
              frameBorder="0"
              height="650px"
              width="100%"
              scrolling="no"
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default FeedbackForm;
