import BaseInput from "./BaseInput";
import { useFormContext } from "react-hook-form";
import { CloseIcon } from "~/icon/close";
import { SearchIcon } from "~/icon/search";
import { styled } from "~/design-system/stitches.config";

export type FormInputProps = {
  onClickSearch?: React.MouseEventHandler<HTMLButtonElement>;
  searchProps?: React.ComponentProps<typeof InputWrapper>;
  onClearSearch?: () => void;
} & React.ComponentProps<typeof BaseInput>;

function FormInput({
  onClickSearch,
  onClearSearch,
  className,
  css,
  ...props
}: FormInputProps) {
  const { register, setValue } = useFormContext();

  const handleClearSearch = () => {
    setValue(props.name, "");
    if (onClearSearch) onClearSearch();
  };
  return (
    <InputWrapper className={className} css={css}>
      <Input>
        <BaseInput {...register(props.name)} {...props} />
        <span onClick={handleClearSearch}>
          <CloseIcon />
        </span>
      </Input>
      <Search onClick={onClickSearch}>
        <SearchIcon />
      </Search>
    </InputWrapper>
  );
}

export default FormInput;

const Search = styled("button", {
  border: "1px solid $neutral500",
  cursor: "pointer",
  flexJustifyAndAlign: "center",
  background: "$neutral50",

  svg: {
    minWidth: "16px",
    size: "16px",
  },

  "&:hover": {
    background: "$primaryGreen50",
  },
  "&:focus-visible": {
    background: "$primaryGreen50",
  },
});

const InputWrapper = styled("div", {
  display: "flex",

  div: {
    flexGrow: 1,
  },

  [`& button`]: {
    flex: "0 0 56px",
    borderLeft: "none",
    borderRadius: "0 2px 2px 0",
  },
  "& input": {
    borderRadius: "2px 0 0 2px ",
  },
});

const Input = styled("div", {
  position: "relative",

  input: {
    width: "100%",
    height: "100%",
    display: "block",
  },

  svg: {
    position: "absolute",
    top: "calc(50% - 5px)",
    right: "12px",
    size: "10px",
    cursor: "pointer",
  },
});
