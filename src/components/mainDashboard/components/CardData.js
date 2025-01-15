import React, { useState, useEffect } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import InfoCard from "../InfoCard";
import { API_ROUTES } from "../../../routes";

const CardData = () => {
    const [newMessagesCount, setNewMessagesCount] = useState(null);
    const [visitsWaitingCount, setVisitsWaitingCount] = useState(null);
    const [tenantsRunningOutCount, setTenantsRunningOutCount] = useState(null);
    const [billsPendingCount, setBillsPendingCount] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchNewMessagesCount = async () => {
            try {
                // const response = await fetch(API_ROUTES.MESSAGES.NEW_COUNT, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${token}`,
                //     },
                //     body: JSON.stringify({
                //         userId: "673a06baec7284a31e0af34e",
                //     }),
                // });

                // if (!response.ok) {
                //     throw new Error('Network response was not ok');
                // }

                // const result = await response.json();
                setNewMessagesCount(0);
            } catch (error) {
                console.error('Error fetching new messages count:', error);
            }
        };

        const fetchVisitsWaitingCount = async () => {
            try {
                const response = await fetch(API_ROUTES.VISITS.WAITING_FOR_APPROVAL, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setVisitsWaitingCount(result.response);
            } catch (error) {
                console.error('Error fetching visits waiting count:', error);
            }
        };

        const fetchTenantsRunningOutCount = async () => {
            try {
                const response = await fetch(API_ROUTES.BILLING.TENANTS_RUNNING_BY_UNITS, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setTenantsRunningOutCount(result.response);
            } catch (error) {
                console.error('Error fetching tenants running out count:', error);
            }
        };

        const fetchBillsPendingCount = async () => {
            try {
                const response = await fetch(API_ROUTES.BILLING.GET_BILLS_PENDING, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const result = await response.json();
                setBillsPendingCount(result.response.count);
            }
            catch (error) {
                console.error('Error fetching bills pending count:', error);
            }
        }

        fetchNewMessagesCount();
        fetchVisitsWaitingCount();
        fetchTenantsRunningOutCount();
        fetchBillsPendingCount();
    }, []);

    return (
        <div className="flex gap-6 mb-4">
            <InfoCard
                count={newMessagesCount !== null ? newMessagesCount : '-'}
                description="New Messages"
                icon={<LuMessagesSquare color="#6F84F8" size="1.5rem" />}
            />
            <InfoCard
                count={visitsWaitingCount !== null ? visitsWaitingCount : '-'}
                description="New Visits Waiting for Decision"
            />
            <InfoCard
                count={tenantsRunningOutCount !== null ? tenantsRunningOutCount : '-'}
                description="Tenants running out of Units"
            />
            <InfoCard
                count={billsPendingCount !== null ? billsPendingCount : '-'}
                description="Bills Pending"
            />
        </div>
    );
};

export default CardData;