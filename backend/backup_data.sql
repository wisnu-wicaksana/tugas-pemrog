--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4 (Postgres.app)
-- Dumped by pg_dump version 17.4 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" VALUES (1, 'wisnuwicaksana100@gmail.com', 'Wisnu Witjaksoeno', '105459053759912280503', true, '2025-06-06 04:19:39.124', '2025-06-06 18:59:14.017');
INSERT INTO public."User" VALUES (2, 'wisnuwicaksana100@students.amikom.ac.id', 'WISNU WICAKSONO 22.11.4728', '103294891145713819897', true, '2025-06-06 19:31:06.915', '2025-06-12 19:05:21.209');
INSERT INTO public."User" VALUES (3, 'fachrirahma49@gmail.com', 'Fachri Rahma', '101738836776774974141', false, '2025-06-17 17:51:04.966', '2025-06-17 17:51:04.966');
INSERT INTO public."User" VALUES (4, 'berliansukmawardani@gmail.com', 'Berlian Sukmawardani', '110646867432559436042', false, '2025-06-18 17:45:21.753', '2025-06-18 17:45:21.753');


--
-- Data for Name: Favorite; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Favorite" VALUES (17, 1, 38524, 'Shingeki no Kyojin Season 3 Part 2', 'https://cdn.myanimelist.net/images/anime/1517/100633.jpg', '2025-07-01 14:43:44.884');
INSERT INTO public."Favorite" VALUES (18, 1, 28977, 'Gintama°', 'https://cdn.myanimelist.net/images/anime/3/72078.jpg', '2025-07-01 14:43:47.144');
INSERT INTO public."Favorite" VALUES (19, 1, 60022, 'One Piece Fan Letter', 'https://cdn.myanimelist.net/images/anime/1455/146229.jpg', '2025-07-01 14:43:49.516');
INSERT INTO public."Favorite" VALUES (20, 1, 918, 'Gintama', 'https://cdn.myanimelist.net/images/anime/10/73274.jpg', '2025-07-01 14:46:23.999');
INSERT INTO public."Favorite" VALUES (21, 1, 52991, 'Sousou no Frieren', 'https://cdn.myanimelist.net/images/anime/1015/138006.jpg', '2025-07-02 04:13:54.145');
INSERT INTO public."Favorite" VALUES (23, 1, 11061, 'Hunter x Hunter (2011)', 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg', '2025-07-02 04:14:00.524');


--
-- Data for Name: Payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Payment" VALUES (1, 1, 'DEV-T41262242866GAOJ2', 100000, 'UNPAID', 'INV-1749294213752', 'BRIVA', '2025-06-07 11:03:34.694', '2025-06-07 11:03:34.694');
INSERT INTO public."Payment" VALUES (6, 1, 'DEV-T41262245393RR8O5', 100000, 'PAID', 'INV-1749751309044', 'BRIVA', '2025-06-12 18:01:49.454', '2025-06-17 17:26:14.538');
INSERT INTO public."Payment" VALUES (7, 3, 'DEV-T41262247831WCJLR', 10000, 'UNPAID', 'INV-1750265534940', 'BRIVA', '2025-06-18 16:52:15.361', '2025-06-18 16:52:15.361');
INSERT INTO public."Payment" VALUES (8, 4, 'DEV-T412622478380RTOQ', 10000, 'UNPAID', 'INV-1750268726137', 'BRIVA', '2025-06-18 17:45:26.517', '2025-06-18 17:45:26.517');


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('12ae4c35-b372-4a25-912e-6d53d739b441', 'de7e01acb0ab668194b54e8d44576c3d76314646b8d46eb1be77be59465bb9d3', '2025-06-06 07:57:29.503236+07', '20250606005729_nama_migrasi', NULL, NULL, '2025-06-06 07:57:29.466782+07', 1);
INSERT INTO public._prisma_migrations VALUES ('3167b0cf-94a3-4d5a-91aa-3139f7bc6905', '3b0afb1b86f1c90a607d005cc0747742f03796196579b1c96a31df5ecca9d999', '2025-06-07 16:46:45.26113+07', '20250607094645_init', NULL, NULL, '2025-06-07 16:46:45.235696+07', 1);
INSERT INTO public._prisma_migrations VALUES ('4916098d-287c-4012-adfe-49093608b1a1', '9f26700a6bb6e65f0de4c55ee915b2782b0f260d6a8a6e1246cc48fab44b919c', '2025-06-13 01:58:35.751497+07', '20250612185833_add_unique_to_merchant_ref', NULL, NULL, '2025-06-13 01:58:35.501902+07', 1);


--
-- Name: Favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Favorite_id_seq"', 23, true);


--
-- Name: Payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Payment_id_seq"', 8, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 4, true);


--
-- PostgreSQL database dump complete
--

