import { useNavigate } from "@remix-run/react";
import { styled } from "@stitches/react";
import React, { useCallback, useMemo } from "react";
import type { StyledCompProps } from "~/design-system/stitches.config";
import BrowserOnly from "~/global-components/BrowserOnly";
import Arrow from "~/icon/Arrow";

type IPaginationProps = {
  totalItems: number;
  itemPerPage: number;
};

type IPaginaComponentProps = IPaginationProps &
  StyledCompProps<typeof PaginationWrap>;

export default function Pagination({
  itemPerPage = 10,
  totalItems,
  ...props
}: IPaginaComponentProps) {
  return (
    <BrowserOnly>
      <PaginationComponent
        {...props}
        itemPerPage={itemPerPage}
        totalItems={totalItems}
      />
    </BrowserOnly>
  );
}

function PaginationComponent({
  itemPerPage = 10,
  totalItems,
  ...props
}: IPaginaComponentProps) {
  const navigate = useNavigate();
  const params = new URL(window.location.href).searchParams;
  const activePage = +(params.get("page") || 1);

  const setPageToURL = (page: number) => {
    params.set("page", page.toString());
    navigate(`?${params}`);
  };

  const handleChangePage = useCallback((page: number) => {
    setPageToURL(page);
  }, []);

  const totalPage = useMemo(() => {
    return Math.ceil(totalItems / itemPerPage);
  }, [totalItems, itemPerPage]);

  const getPages = useMemo(() => {
    return Array(totalPage)
      .fill(0)
      .map((_, index) => {
        return index + 1;
      });
  }, [totalPage]);

  const handleArrow = useCallback(
    (num: 1 | -1) => {
      setPageToURL(activePage + num);
    },
    [activePage]
  );

  return (
    <PaginationWrap {...props}>
      <ArrowButton
        disabled={activePage === 1}
        onClick={() => handleArrow(-1)}
        type="button"
      >
        <Arrow dir="left" />
      </ArrowButton>

      {getPages.map((page) => (
        <PageIndex
          active={activePage === page}
          type="button"
          onClick={() => handleChangePage(page)}
          key={page}
        >
          <p
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {page}
          </p>
        </PageIndex>
      ))}

      <ArrowButton
        disabled={totalPage === activePage}
        onClick={() => handleArrow(1)}
        type="button"
      >
        <Arrow dir="right" />
      </ArrowButton>
    </PaginationWrap>
  );
}

const PaginationWrap = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "$x3",
  marginBottom: "$x30",
  marginTop: "10px",
});

const ArrowButton = styled("button", {
  $$itemGap: "$space$x6",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  background: "transparent",
  border: "1px solid $neutral500",
  borderRadius: "50%",
  width: "30px",
  height: "30px",
  svg: {
    size: "16px",
    transition: "0.15s",
  },

  variants: {
    hidden: {
      true: {
        display: "none",
      },
    },
    disabled: {
      true: {
        pointerEvents: "none",
        cursor: "not-allowed",
        background: "$neutral100",
      },
    },
  },
  "&:hover": {
    border: "1px solid $primaryGreen500",
    color: "$primaryGreen500",
    background: "$primaryGreen50",
    transition: "0.2s",
  },
});

const PageIndex = styled("button", {
  $$itemGap: "$space$x6",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  background: "transparent",
  border: "1px solid $neutral500",
  borderRadius: "50%",
  size: "34px",

  variants: {
    active: {
      true: {
        background: "$primary2Green",
        color: "white",
        border: "none",
      },
    },
    hidden: {
      true: {
        display: "none",
      },
    },
  },
  "&:hover": {
    border: "1px solid $primaryGreen500",
    color: "$primaryGreen500",
    background: "$primaryGreen50",
    transition: "0.2s",
  },
});
