// import PropTypes from 'prop-types'

import SlotTable from "@/components/Admin/SlotTable";
import { Divider } from "antd";

const AdminSlots = () => {
    return (
        <div>
            <Divider
                orientation="left"
                style={{
                    fontFamily: "Inter",
                    fontSize: "1.8rem",
                    marginBottom: "40px",
                }}
            >
                Slot
            </Divider>
            <SlotTable />
        </div>
    );
};

AdminSlots.propTypes = {};

export default AdminSlots;
