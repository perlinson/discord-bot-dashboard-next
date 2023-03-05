// Chakra imports
import { Box, HStack, Icon, Spacer, Text } from '@chakra-ui/react';
import { config } from '@/config/common';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import { ReactNode } from 'react';
import { SelectField } from '../forms/SelectField';
import { useSettingsStore } from '@/stores';
import { languages, names } from '@/config/translations/provider';
import { common } from '@/config/translations/common';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box w="full" h="full" overflow="auto" py={40}>
      {children}
      <HStack pos="fixed" top={0} w="full" bg="globalBg" px={{ base: 5, lg: 10 }} py={2}>
        {config.icon != null && <Icon color="textColorPrimary" as={config.icon} w={10} h={10} />}
        <Text fontWeight="600" fontSize="lg">
          {config.name}
        </Text>
        <Spacer />
        <Box w="150px">
          <LanguageSelect />
        </Box>
        <ThemeSwitch />
      </HStack>
    </Box>
  );
}

function LanguageSelect() {
  const [lang, setLang] = useSettingsStore((s) => [s.lang, s.setLang]);

  return (
    <SelectField
      id="lang"
      value={{
        label: names[lang],
        value: lang,
      }}
      menuPlacement="top"
      onChange={(e) => e != null && setLang(e.value)}
      options={languages.map(({ name, key }) => ({
        label: name,
        value: key,
      }))}
      placeholder={<common.T text="select lang" />}
    />
  );
}
