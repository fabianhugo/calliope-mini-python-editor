import { Tag, TagProps } from "@chakra-ui/react";

interface V3TagProps extends TagProps {}

const V3Tag = ({ ...props }: V3TagProps) => {
  return (
    <Tag
      fontWeight="semibold"
      background="brand.500"
      color="gray.25"
      minH="unset"
      pt="1px"
      pb="1px"
      pl={1.5}
      pr={1.5}
      ml={1.5}
      borderRadius={4}
      {...props}
    >
      V3
    </Tag>
  );
};

export default V3Tag;
