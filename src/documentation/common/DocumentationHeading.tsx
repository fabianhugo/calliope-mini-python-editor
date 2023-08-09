/**
 * (c) 2021-2022, Micro:bit Educational Foundation and contributors
 *
 * SPDX-License-Identifier: MIT
 */
import { Text, TextProps } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";
import V3Tag from "../common/V3Tag";

interface DocumentationHeadingProps extends TextProps {
  name: string;
  isV2Only: boolean;
}

const DocumentationHeading = ({
  name,
  isV2Only,
  ...props
}: DocumentationHeadingProps) => {
  return (
    <Text as="h3" fontSize="lg" fontWeight="semibold" {...props}>
      {name}
      {isV2Only && (
        <Flex display="inline-flex">
          <V3Tag />
        </Flex>
      )}
    </Text>
  );
};

export default DocumentationHeading;
