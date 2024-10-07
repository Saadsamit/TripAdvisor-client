import { useQuery } from "@tanstack/react-query";
import { allPaymentApi, myPaymentApi } from "./paymentApi";

const allPayment = () => {
  return useQuery({
    queryKey: [`allPayment`],
    queryFn: async () => await allPaymentApi(),
  });
};

const myPayment = () => {
    return useQuery({
      queryKey: [`myPayment`],
      queryFn: async () => await myPaymentApi(),
    });
  };

const paymentService = {
    allPayment,
    myPayment
};

export default paymentService;
