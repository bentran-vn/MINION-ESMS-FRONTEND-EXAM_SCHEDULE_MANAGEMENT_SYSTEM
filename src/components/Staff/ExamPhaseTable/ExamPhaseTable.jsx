// import PropTypes from "prop-types";

import { Button, Select, Table, Tag, Typography } from "antd";

import * as St from "./ExamPhaseTable.styled";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import configs from "@/configs";
import instance from "@/utils/instance";

const ExamPhaseTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const navigate = useNavigate();
    const pageSize = 10;

    const columns = [
        // Your columns
        {
            title: "No",
            width: "10%",
            render: (record) => {
                // console.log(record);
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Name",
            width: "15%",
            render: (record) => {
                return <Typography>{record.ePName}</Typography>;
            },
        },
        {
            title: "Start Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.sDay}</Typography>;
            },
        },
        {
            title: "End Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.eDay}</Typography>;
            },
        },
        {
            title: "Type",
            width: "15%",
            render: (record) => {
                if (record.des === 0) {
                    return <Tag color="red">NORMAL</Tag>;
                } else {
                    return <Tag color="green">COURSERA</Tag>;
                }
            },
        },
        {
            title: "Status",
            width: "15%",
            render: (record) => {
                if (record.courseDone === 1) {
                    return <Tag color="default">CLOSED</Tag>;
                } else {
                    return <Tag color="green">PENDING</Tag>;
                }
            },
        },
        {
            title: "Operation",
            width: "15%",
            render: (record) => {
                return (
                    <Button
                        type="primary"
                        style={{ background: "#5194f2" }}
                        onClick={() => handleEdit(record)}
                    >
                        Detail
                    </Button>
                );
            },
        },
    ];

    const fetchData = () => {
        // console.log(semesterId);

        if (semesterId !== 0) {
            instance
                .get(`examPhases/${semesterId}`)
                .then((res) => {
                    const formattedData = res.data.data
                        .sort((a, b) => b.id - a.id)
                        .map((item, index) => ({
                            ...item,
                            key: item.id,
                            no: index + 1,
                        }));
                    setData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        }
    };

    const fetchSemester = () => {
        setLoading(true);
        instance
            .get("semesters")
            .then((res) => {
                const semestersData = res.data.data
                    .sort((a, b) => b.id - a.id)
                    .map((item) => ({
                        label: item.season + " " + item.year,
                        value: item.id,
                    }));
                setSemesterId(semestersData[0].value);
                setSelectSemester(semestersData[0].label);
                setSemesters(semestersData);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchData();
    }, [semesterId]);

    const handleEdit = (e) => {
        // navigate(configs.routes.staff + `/examPhase/${e.no}`);
        navigate(configs.routes.staff + `/examSlot/${e.id}`, {
            state: {
                data: e,
            },
        });
    };

    const handleSelect = (id, option) => {
        if (semesterId !== id) {
            setLoading(true);
            setSelectSemester(option.label);
            setSemesterId(id);
        }
    };

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelect}
                    value={selectSemester}
                    className="select"
                    options={semesters}
                />
            </St.StyledLeft>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: pageSize,
                    hideOnSinglePage: data.length <= pageSize,
                }}
            />
        </St.DivTable>
    );
};

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
