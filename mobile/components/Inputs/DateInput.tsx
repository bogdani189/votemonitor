import React, { useState } from "react";
import { Sheet, XStack } from "tamagui";
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
// import DateTimePickerModal from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Typography } from "../Typography";
import { Icon } from "../Icon";

export const DateInput = ({
  minimumDate,
  maximumDate,
}: {
  minimumDate?: Date;
  maximumDate?: Date;
}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  return (
    <>
      <XStack
        onPress={() => setOpen(true)}
        backgroundColor="white"
        justifyContent="space-between"
        alignItems="center"
        paddingHorizontal={14}
        paddingVertical="$xs"
        borderWidth={1}
        borderColor="$gray3"
        borderRadius={8}
        gap="$xs"
      >
        <Typography preset="body1" color="$gray7">
          {date.toLocaleDateString("en-GB")}
        </Typography>
        <Icon icon="calendar" color="transparent" />

        {Platform.OS === "ios" ? (
          <Sheet modal native open={open} onOpenChange={setOpen} zIndex={100_000} snapPoints={[45]}>
            <Sheet.Overlay />
            <Sheet.Frame padding="$md">
              <XStack gap="$sm" justifyContent="space-between" width="100%"></XStack>
              <XStack flex={1} justifyContent="center" alignItems="center">
                <RNDateTimePicker
                  display="spinner"
                  value={date}
                  is24Hour={true}
                  onChange={onChange}
                  minimumDate={minimumDate}
                  maximumDate={maximumDate}
                />
              </XStack>
            </Sheet.Frame>
          </Sheet>
        ) : (
          open &&
          // <DateTimePickerModal
          //   value={date}
          //   onChange={onChange}
          //   minimumDate={minimumDate}
          //   maximumDate={maximumDate}
          // />
          console.log("todo")
        )}
      </XStack>
    </>
  );
};
