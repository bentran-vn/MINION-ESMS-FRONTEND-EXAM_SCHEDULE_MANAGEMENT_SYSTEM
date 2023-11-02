// import PropTypes from "prop-types";

import { Flex, Popconfirm, Select, Table, Tag, Typography } from "antd";
import { useEffect, useState } from "react";

import * as St from "./MyExamSlot.styled";
import { useNavigate } from "react-router-dom";
import instance from "@/utils/instance";

const CancelRegisterTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [semesters, setSemesters] = useState([]);
    const [selectSemester, setSelectSemester] = useState();
    const [semesterId, setSemesterId] = useState(0);
    const [selectPhase, setSelectPhase] = useState();
    const [phases, setPhases] = useState([]);
    const [phaseId, setPhaseId] = useState(0);
    const [statusSemester, setStatusSemester] = useState(false);
    const navigate = useNavigate();

    // useEffect(() => {
    // }, []);

    const fetchData = () => {
        setLoading(true);
        if (phaseId !== 0) {
            setLoading(true);
            instance
                .get(
                    `examiners/scheduledByPhase?userId=256&examphaseId=${phaseId}`
                )
                .then((res) => {
                    const formattedData = res.data.data.map((item, index) => ({
                        ...item,
                        key: index + 1,
                        no: index + 1,
                        startTime: item.startTime.slice(0, 5),
                        endTime: item.endTime.slice(0, 5),
                    }));
                    setData(formattedData);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {});
        } else {
            setData([]);
            setLoading(false);
        }
    };

    const fetchSemester = () => {
        instance
            .get("semesters")
            .then((res) => {
                const semestersData = res.data.data.map((item) => ({
                    label: item.season + " " + item.year,
                    value: item.id,
                    status: item.status,
                }));
                const newData = semestersData.reverse();
                setSemesterId(newData[0].value);
                setSelectSemester(newData[0].label);
                setSemesters(newData);
                if (newData[0].status === 0) {
                    setStatusSemester(false);
                } else {
                    setStatusSemester(true);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    const fetchPhase = () => {
        // console.log(semesterId);
        instance
            .get(`examPhases/${semesterId}`)
            .then((res) => {
                if (semesterId !== 0) {
                    if (res.data.data.length !== 0) {
                        const phaseData = res.data.data.map((item) => ({
                            label: item.ePName,
                            value: item.id,
                        }));
                        const newData = phaseData.reverse();
                        setSelectPhase(newData[0].label);
                        setPhaseId(newData[0].value);
                        setPhases(newData);
                    } else {
                        setSelectPhase("");
                        setPhases([]);
                    }
                }
            })
            .catch((error) => {
                console.log("Phase: " + error);
            })
            .finally(() => {});
    };

    useEffect(() => {
        fetchSemester();
    }, []);

    useEffect(() => {
        fetchPhase();
    }, [semesterId]);

    useEffect(() => {
        fetchData();
    }, [phaseId]);

    const handleRegister = () => {
        navigate(`/lecturer/register/${phaseId}`);
    };

    const handleDelete = () => {};

    const handleSelectSemester = (id, option) => {
        if (id !== semesterId) {
            if (option.status === 0) {
                // console.log("false");
                setStatusSemester(false);
            } else {
                // console.log("true");
                setStatusSemester(true);
            }
            setSelectSemester(option.label);
            setSemesterId(id);
            setPhaseId(0);
            setPhases([]);
        }
    };

    const handleSelectPhase = (id, option) => {
        setSelectPhase(option.label);
        setPhaseId(id);
    };

    const columns = [
        {
            title: "No",
            width: "10%",
            render: (record) => {
                return <Typography>{record.no}</Typography>;
            },
        },
        {
            title: "Day",
            width: "15%",
            render: (record) => {
                return <Typography>{record.day}</Typography>;
            },
            // onCell: (record, rowIndex) => {
            //     let rowSpan = 1;
            //     if (rowIndex > 0 && data[rowIndex - 1].day === record.day) {
            //         rowSpan = 0;
            //     } else {
            //         let count = 0;
            //         while (
            //             rowIndex + count < data.length &&
            //             data[rowIndex + count].day === record.day
            //         ) {
            //             count++;
            //         }
            //         rowSpan = count;
            //     }
            //     return {
            //         rowSpan: rowSpan,
            //     };
            // },
        },
        {
            title: "Start Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.startTime}</Typography>;
            },
        },
        {
            title: "End Time",
            width: "15%",
            render: (record) => {
                return <Typography>{record.endTime}</Typography>;
            },
        },
        {
            title: "Room",
            width: "15%",
            render: (record) => {
                if (record.roomCode === "N/A") {
                    return <Tag color="default">COMING SOON</Tag>;
                } else {
                    return <Typography>{record.roomCode}</Typography>;
                }
            },
        },
        {
            title: "Location",
            width: "15%",
            render: (record) => {
                return <Typography>{record.roomLocation}</Typography>;
            },
        },
        {
            title: "Operation",
            width: "15%",
            render: (record) => {
                if (record.register === false) {
                    return (
                        <Typography.Link disabled>
                            Can not unregister
                        </Typography.Link>
                    );
                } else {
                    return (
                        <Popconfirm
                            title="Sure to register?"
                            onConfirm={() => handleDelete(record.key)}
                        >
                            <Typography.Link>Unregister</Typography.Link>
                        </Popconfirm>
                    );
                }
            },
        },
    ];

    return (
        <St.DivTable>
            <St.StyledLeft>
                <Typography className="title">Semester: </Typography>
                <Select
                    onChange={handleSelectSemester}
                    value={selectSemester}
                    className="select"
                    options={semesters}
                />
                {phases.length !== 0 ? (
                    <Flex>
                        <Typography className="title">Phase: </Typography>
                        <Select
                            onChange={handleSelectPhase}
                            value={selectPhase}
                            className="select"
                            options={phases}
                        />
                    </Flex>
                ) : (
                    <div></div>
                )}
            </St.StyledLeft>

            {statusSemester === false ? null : (
                <St.ButtonTable
                    type="primary"
                    style={{ marginBottom: 16 }}
                    onClick={handleRegister}
                >
                    Register
                </St.ButtonTable>
            )}

            <Table
                scroll={{ x: true }}
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
                pagination={{
                    pageSize: 6,
                    hideOnSinglePage: data.length <= 6,
                    showSizeChanger: false,
                }}
            />
        </St.DivTable>
    );
};

CancelRegisterTable.propTypes = {};

export default CancelRegisterTable;
