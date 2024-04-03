import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const { orders } = useGetMyRestaurantOrders();

  const isEditing = !!restaurant;

  const [selected, setSelected] = useState("Orders");

  return (
    <Tabs defaultValue="orders">
      <TabsList className="space-x-5 mb-10">
        <TabsTrigger
          value="orders"
          onClick={() => setSelected("Orders")}
          className={` ${
            selected === "Orders" ? "underline text-orange-500" : ""
          }`}
        >
          Order
        </TabsTrigger>
        <TabsTrigger
          value="manage-restaurant"
          onClick={() => setSelected("manage-restaurant")}
          className={` ${
            selected !== "Orders" ? "underline text-orange-500" : ""
          }`}
        >
          Manage Restaurant
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className="space-y-5 bg-gray-50 p-10 rounded-lg"
      >
        <h2 className="text-2xl font-bold">{orders?.length} active orders</h2>
        {orders?.map((order) => (
          <OrderItemCard order={order} />
        ))}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm
          restaurant={restaurant}
          onSave={isEditing ? updateRestaurant : createRestaurant}
          isLoading={isCreateLoading || isUpdateLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ManageRestaurantPage;
