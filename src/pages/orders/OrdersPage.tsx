import { Button, Card, Collapse, Form, Input, Space } from "antd";
import { Store } from "antd/lib/form/interface";
import React, { useState } from "react";
import { useOrders, useUser } from "services/api";

const OrdersPage = () => {
  const [user] = useUser();
  const [orders, ordersLoading, ordersError] = useOrders();
  const [isEditing, setEditing] = useState(false);
  const isAdmin = user?.email === "blackjadedwolf@aol.com";

  const userOrders = isAdmin
    ? orders
    : orders?.filter((order) => order.email === user?.email);

  const { Panel } = Collapse;

  const onFinish = (values: Store) => {
    console.log(values);
  };

  return (
    <>
      <ul>
        {!ordersLoading ? (
          userOrders &&
          userOrders.map((order) => {
            return (
              <>
                <Form onFinish={onFinish}>
                  <Space direction="horizontal">
                    <Form.Item name="id">
                      <Input disabled defaultValue={order.id} />
                    </Form.Item>
                    <Form.Item name="email">
                      <Input readOnly defaultValue={order.email} />
                    </Form.Item>
                    <Form.Item name="lastName">
                      <Input
                        readOnly={!isEditing}
                        defaultValue={order.lastName}
                      />
                    </Form.Item>
                    <Form.Item name="firstName">
                      <Input
                        readOnly={!isEditing}
                        defaultValue={order.firstName}
                      />
                    </Form.Item>
                    <Collapse>
                      <Panel header="Cards" key="1">
                        {order.cards.map((card) => {
                          return <Card type="inner">{card.player_name}</Card>;
                        })}
                      </Panel>
                    </Collapse>
                    {isEditing ? (
                      <>
                        <Button type="primary" htmlType="submit">
                          Save
                        </Button>
                        <Button
                          type="default"
                          htmlType="reset"
                          onClick={() => {
                            setEditing(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => {
                          setEditing(true);
                        }}
                      >
                        Edit Order
                      </Button>
                    )}
                  </Space>
                </Form>
              </>
            );
          })
        ) : (
          <p>Loading orders...</p>
        )}
        {ordersError && <p>Error loading orders, please try again later</p>}
      </ul>
    </>
  );
};

export default OrdersPage;
