export interface Customer {
  id: number;
  reference: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_gst: string;
  customer_business_name: string;
  customer_billing_address: string;
  customer_shipping_address: string;
  customer_gst_state: string;
  customer_gst_state_code: string;
  created_at: string;
}

export interface CustomerInput {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  customer_gst: string;
  customer_business_name: string;
  customer_billing_address: string;
  customer_shipping_address: string;
  customer_gst_state: string;
  customer_gst_state_code: string;
}
