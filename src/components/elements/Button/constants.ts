export type ButtonColorType = "primary" | "gray";
export type ButtonVariantType = "outlined" | "contained";

export const ButtonColor: Record<
  ButtonVariantType,
  Record<ButtonColorType, string>
> = {
  contained: {
    primary:
      "text-white border border-solid bg-primary-500 hover:bg-primary-600",
    gray: "text-white border border-solid bg-gray-500 hover:bg-gray-600",
  },
  outlined: {
    primary:
      "border border-solid bg-white border-primary-500 hover:bg-primary-100 text-primary-500",
    gray: "border border-solid bg-white border-gray-500 hover:bg-gray-100 text-gray-600",
  },
};
