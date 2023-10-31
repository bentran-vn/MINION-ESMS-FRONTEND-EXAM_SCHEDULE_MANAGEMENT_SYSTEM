import styled from "styled-components";
import { Button, Flex, Table } from "antd";
import Theme from "@/Theme";

export const DivTable = styled.div`
    margin-top: 20px;
    padding-top: 50px;
    position: relative;

    .ant-form-item-explain-error {
        position: absolute;
        /* color: green; */
    }
`;

export const ButtonTable = styled(Button)`
    position: absolute;
    top: 0;
    right: 0;
`;

export const StyledTable = styled(Table)`
    .ant-table-cell {
        height: 65px;
        font-family: ${Theme.font.primary_font};
        font-size: 1.5rem;
    }

    .ant-typography {
        font-family: ${Theme.font.primary_font};
        font-size: 1.4rem;
    }  

    .ant-tag {
        font-family: ${Theme.font.primary_font};
    }
`;

export const StyledLeft = styled(Flex)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .title {
        margin-right: 10px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 1.6rem;
        line-height: 1;
        font-weight: 500;
        font-family: ${Theme.font.primary_font};
    }

    .select {
        min-width: 120px;
        font-family: ${Theme.font.primary_font};
        font-weight: ;
    }


    .ant-select-item-option-content {
        font-family: ${Theme.font.primary_font} !important;
    }
`;

export const FlexStyled = styled(Flex)`
    display: flex;
    justify-content: center;
    align-items: center;

    .form__title {
        min-width: 100px;
        font-family: ${Theme.font.primary_font};
    }
    .form__input {
        width: 100%;
        font-family: ${Theme.font.primary_font} !important;
        font-weight: 300;
    }
`;
