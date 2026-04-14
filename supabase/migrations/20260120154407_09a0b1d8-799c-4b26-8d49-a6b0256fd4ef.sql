-- Drop the overly permissive policies
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;
DROP POLICY IF EXISTS "Anyone can submit consultation" ON public.consultations;

-- Create more secure policies that still allow anonymous access but with rate limiting potential
-- Orders: Allow inserts but require all mandatory fields
CREATE POLICY "Anyone can create orders with valid data" ON public.orders 
FOR INSERT WITH CHECK (
    customer_name IS NOT NULL AND 
    customer_email IS NOT NULL AND 
    customer_phone IS NOT NULL AND 
    shipping_address IS NOT NULL AND
    total_amount > 0
);

-- Order items: Only allow insert if the order exists and was just created (within last 5 minutes)
CREATE POLICY "Anyone can create order items for recent orders" ON public.order_items 
FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.orders 
        WHERE orders.id = order_items.order_id 
        AND orders.created_at > now() - interval '5 minutes'
    )
);

-- Consultations: Allow insert with valid data
CREATE POLICY "Anyone can submit consultation with valid data" ON public.consultations 
FOR INSERT WITH CHECK (
    name IS NOT NULL AND 
    phone IS NOT NULL
);