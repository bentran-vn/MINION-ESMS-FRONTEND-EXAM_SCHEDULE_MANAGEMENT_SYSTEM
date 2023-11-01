// import PropTypes from "prop-types";

import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Table,
    Tag,
    Typography,
} from "antd";

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

    const fetchData = () => {
        console.log(semesterId);

        if (semesterId !== 0) {
            instance
                .get(`examPhases/${semesterId}`)
                .then((res) => {
                    console.log(res);
                    const formattedData = res.data.data.map((item, index) => ({
                        ...item,
                        key: item.id,
                        no: index + 1,
                    }));
                    console.log(formattedData);
                    setData(formattedData);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    };

    const fetchSemester = () => {
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
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchData();
    }, [semesterId]);

    const handleEdit = (e) => {
        console.log(e);
        // navigate(configs.routes.staff + `/examPhase/${e.no}`);
        navigate(configs.routes.staff + `/examPhase/${e.id}`, {
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
                return <Typography>{record.startDay}</Typography>;
            },
        },
        {
            title: "End Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.endDay}</Typography>;
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
                if (record.status === false) {
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
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                }}
            />
        </St.DivTable>
    );
};

ExamPhaseTable.propTypes = {};

export default ExamPhaseTable;
