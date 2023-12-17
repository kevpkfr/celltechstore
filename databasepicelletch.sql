PGDMP  :                    {            databasecelltech    16.1    16.1 &    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    40963    databasecelltech    DATABASE     �   CREATE DATABASE databasecelltech WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Ecuador.1252';
     DROP DATABASE databasecelltech;
                postgres    false                        3079    40964 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    40986    order    TABLE     6  CREATE TABLE public."order" (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    adress character varying(50) NOT NULL,
    price numeric(8,2) NOT NULL,
    date character varying(25) NOT NULL,
    status character varying(50) NOT NULL,
    "stripeId" character varying,
    "userId" uuid NOT NULL
);
    DROP TABLE public."order";
       public         heap    postgres    false    2            �            1259    40981    order-product    TABLE     �   CREATE TABLE public."order-product" (
    "orderId" uuid NOT NULL,
    "productId" uuid NOT NULL,
    quantity integer NOT NULL
);
 #   DROP TABLE public."order-product";
       public         heap    postgres    false            �            1259    40975    producto    TABLE     �   CREATE TABLE public.producto (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    nombre character varying(50) NOT NULL,
    precio double precision NOT NULL,
    descripcion character varying(200) NOT NULL
);
    DROP TABLE public.producto;
       public         heap    postgres    false    2            �            1259    41007    rol    TABLE     e   CREATE TABLE public.rol (
    id integer NOT NULL,
    "rolNombre" character varying(10) NOT NULL
);
    DROP TABLE public.rol;
       public         heap    postgres    false            �            1259    41006 
   rol_id_seq    SEQUENCE     �   CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.rol_id_seq;
       public          postgres    false    221            �           0    0 
   rol_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;
          public          postgres    false    220            �            1259    40994    usuario    TABLE     �   CREATE TABLE public.usuario (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "nombreUsuario" character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying NOT NULL
);
    DROP TABLE public.usuario;
       public         heap    postgres    false    2            �            1259    41015    usuario_rol    TABLE     _   CREATE TABLE public.usuario_rol (
    usuario_id uuid NOT NULL,
    rol_id integer NOT NULL
);
    DROP TABLE public.usuario_rol;
       public         heap    postgres    false            <           2604    41010    rol id    DEFAULT     `   ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);
 5   ALTER TABLE public.rol ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �          0    40986    order 
   TABLE DATA           X   COPY public."order" (id, adress, price, date, status, "stripeId", "userId") FROM stdin;
    public          postgres    false    218   �-       �          0    40981    order-product 
   TABLE DATA           K   COPY public."order-product" ("orderId", "productId", quantity) FROM stdin;
    public          postgres    false    217   (.       �          0    40975    producto 
   TABLE DATA           C   COPY public.producto (id, nombre, precio, descripcion) FROM stdin;
    public          postgres    false    216   �.       �          0    41007    rol 
   TABLE DATA           .   COPY public.rol (id, "rolNombre") FROM stdin;
    public          postgres    false    221   2/       �          0    40994    usuario 
   TABLE DATA           G   COPY public.usuario (id, "nombreUsuario", email, password) FROM stdin;
    public          postgres    false    219   ^/       �          0    41015    usuario_rol 
   TABLE DATA           9   COPY public.usuario_rol (usuario_id, rol_id) FROM stdin;
    public          postgres    false    222   D0       �           0    0 
   rol_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.rol_id_seq', 1, false);
          public          postgres    false    220            B           2606    40993 $   order PK_1031171c13130102495201e3e20 
   CONSTRAINT     f   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20";
       public            postgres    false    218            P           2606    41019 *   usuario_rol PK_40b321ebb932d588934043a2639 
   CONSTRAINT     z   ALTER TABLE ONLY public.usuario_rol
    ADD CONSTRAINT "PK_40b321ebb932d588934043a2639" PRIMARY KEY (usuario_id, rol_id);
 V   ALTER TABLE ONLY public.usuario_rol DROP CONSTRAINT "PK_40b321ebb932d588934043a2639";
       public            postgres    false    222    222            >           2606    40980 '   producto PK_5be023b11909fe103e24c740c7d 
   CONSTRAINT     g   ALTER TABLE ONLY public.producto
    ADD CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY (id);
 S   ALTER TABLE ONLY public.producto DROP CONSTRAINT "PK_5be023b11909fe103e24c740c7d";
       public            postgres    false    216            D           2606    41001 &   usuario PK_a56c58e5cabaa04fb2c98d2d7e2 
   CONSTRAINT     f   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2";
       public            postgres    false    219            J           2606    41012 "   rol PK_c93a22388638fac311781c7f2dd 
   CONSTRAINT     b   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.rol DROP CONSTRAINT "PK_c93a22388638fac311781c7f2dd";
       public            postgres    false    221            @           2606    40985 ,   order-product PK_ff97618b834578292135c5b2b0f 
   CONSTRAINT     �   ALTER TABLE ONLY public."order-product"
    ADD CONSTRAINT "PK_ff97618b834578292135c5b2b0f" PRIMARY KEY ("orderId", "productId");
 Z   ALTER TABLE ONLY public."order-product" DROP CONSTRAINT "PK_ff97618b834578292135c5b2b0f";
       public            postgres    false    217    217            L           2606    41014 "   rol UQ_219757a66cff5ac7898e2ad9a86 
   CONSTRAINT     f   ALTER TABLE ONLY public.rol
    ADD CONSTRAINT "UQ_219757a66cff5ac7898e2ad9a86" UNIQUE ("rolNombre");
 N   ALTER TABLE ONLY public.rol DROP CONSTRAINT "UQ_219757a66cff5ac7898e2ad9a86";
       public            postgres    false    221            F           2606    41005 &   usuario UQ_2863682842e688ca198eb25c124 
   CONSTRAINT     d   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_2863682842e688ca198eb25c124" UNIQUE (email);
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_2863682842e688ca198eb25c124";
       public            postgres    false    219            H           2606    41003 &   usuario UQ_7ea57d693272b94228192c612bf 
   CONSTRAINT     n   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT "UQ_7ea57d693272b94228192c612bf" UNIQUE ("nombreUsuario");
 R   ALTER TABLE ONLY public.usuario DROP CONSTRAINT "UQ_7ea57d693272b94228192c612bf";
       public            postgres    false    219            M           1259    41020    IDX_29e9a9079c7ba01c1b301cf555    INDEX     ^   CREATE INDEX "IDX_29e9a9079c7ba01c1b301cf555" ON public.usuario_rol USING btree (usuario_id);
 4   DROP INDEX public."IDX_29e9a9079c7ba01c1b301cf555";
       public            postgres    false    222            N           1259    41021    IDX_ac8911cd54a61461c992654140    INDEX     Z   CREATE INDEX "IDX_ac8911cd54a61461c992654140" ON public.usuario_rol USING btree (rol_id);
 4   DROP INDEX public."IDX_ac8911cd54a61461c992654140";
       public            postgres    false    222            T           2606    41037 *   usuario_rol FK_29e9a9079c7ba01c1b301cf5555    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario_rol
    ADD CONSTRAINT "FK_29e9a9079c7ba01c1b301cf5555" FOREIGN KEY (usuario_id) REFERENCES public.usuario(id) ON UPDATE CASCADE ON DELETE CASCADE;
 V   ALTER TABLE ONLY public.usuario_rol DROP CONSTRAINT "FK_29e9a9079c7ba01c1b301cf5555";
       public          postgres    false    4676    219    222            Q           2606    41022 ,   order-product FK_9c977b466fdb4f503740b4de1cc    FK CONSTRAINT     �   ALTER TABLE ONLY public."order-product"
    ADD CONSTRAINT "FK_9c977b466fdb4f503740b4de1cc" FOREIGN KEY ("orderId") REFERENCES public."order"(id);
 Z   ALTER TABLE ONLY public."order-product" DROP CONSTRAINT "FK_9c977b466fdb4f503740b4de1cc";
       public          postgres    false    218    217    4674            U           2606    41042 *   usuario_rol FK_ac8911cd54a61461c9926541401    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario_rol
    ADD CONSTRAINT "FK_ac8911cd54a61461c9926541401" FOREIGN KEY (rol_id) REFERENCES public.rol(id);
 V   ALTER TABLE ONLY public.usuario_rol DROP CONSTRAINT "FK_ac8911cd54a61461c9926541401";
       public          postgres    false    4682    222    221            S           2606    41032 $   order FK_caabe91507b3379c7ba73637b84    FK CONSTRAINT     �   ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES public.usuario(id);
 R   ALTER TABLE ONLY public."order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84";
       public          postgres    false    4676    218    219            R           2606    41027 ,   order-product FK_ddbf968a6fa276f364f1d52a3fb    FK CONSTRAINT     �   ALTER TABLE ONLY public."order-product"
    ADD CONSTRAINT "FK_ddbf968a6fa276f364f1d52a3fb" FOREIGN KEY ("productId") REFERENCES public.producto(id);
 Z   ALTER TABLE ONLY public."order-product" DROP CONSTRAINT "FK_ddbf968a6fa276f364f1d52a3fb";
       public          postgres    false    216    217    4670            �   ~   x��;�0 ��9pk;qHFE�@*c%�_�20q{xx�\n�uSAץa$����Y�
߼����� 6F?�H:
��4M��뼤�|����`M����:�=�γb!u�$����b����� �      �   K   x�ʱ�  �Zv!������GH��K��8j��M,�#l�Qt����04�Oeh>;�p�͹�hSx � a�A      �   �   x�%�Kj1��)|�_�.ٸ-	��n0CN�&yԶ���E4b��c�¸�0�O�AcU<��5�(!�~�����qd��H�,�Y��GMȑLTj�1��T�剠������u\�4)L�j��%d+oQش7p�����X�Ėy���>?�s��T8.      �      x�3�LL����2�,-N-����� : �      �   �   x�e�Mo�0��3�\���ߗ����6��l�h��L�ӏ�wy����3��Ja&��R	�=׊B�z�c��u}Z��kBچ$?sWV¾e���x䬬_�A�b�4z�旂g�V�n7�M�ĵ!	c�H����r CLy�����Ws_�������.}���W���͵]E��V�i���t��֏�)������):F�_-G�      �   O   x��˻�0 �Zv��]�Hp���wY��`�L��H'TM�e;Y�E��k�i�`Gf�'�����*�{n � �S     