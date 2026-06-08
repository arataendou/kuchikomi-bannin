-- 歯科医院
CREATE TABLE clinics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  google_place_id text NOT NULL,
  line_user_id text,
  line_notify_enabled boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clinics_select_own" ON clinics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "clinics_insert_own" ON clinics
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "clinics_update_own" ON clinics
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "clinics_delete_own" ON clinics
  FOR DELETE USING (auth.uid() = user_id);

-- 口コミ
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  clinic_id uuid REFERENCES clinics(id) ON DELETE CASCADE NOT NULL,
  review_id text NOT NULL,
  author_name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  published_at timestamptz NOT NULL,
  sentiment text CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  notified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  UNIQUE(clinic_id, review_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reviews_select_own" ON reviews
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM clinics
      WHERE clinics.id = reviews.clinic_id AND clinics.user_id = auth.uid()
    )
  );

CREATE POLICY "reviews_insert_admin" ON reviews
  FOR INSERT WITH CHECK (true);

-- 月額サブスク
CREATE TABLE subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  active boolean DEFAULT true,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_select_own" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- インデックス
CREATE INDEX idx_clinics_user ON clinics(user_id);
CREATE INDEX idx_reviews_clinic ON reviews(clinic_id);
CREATE INDEX idx_reviews_published ON reviews(published_at DESC);
