-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "categoria_comunidad" (
    "id_categoria_comunidad" UUID NOT NULL DEFAULT gen_random_uuid(),
    "descripcion" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "categoria_comunidad_pkey" PRIMARY KEY ("id_categoria_comunidad")
);

-- CreateTable
CREATE TABLE "ciclo_pago" (
    "id_ciclo_pago" UUID NOT NULL DEFAULT gen_random_uuid(),
    "frecuencia" INTEGER NOT NULL,
    "tipo_frecuencia" TEXT NOT NULL,

    CONSTRAINT "ciclo_pago_pkey" PRIMARY KEY ("id_ciclo_pago")
);

-- CreateTable
CREATE TABLE "estado_pago" (
    "id_estado_pago" UUID NOT NULL DEFAULT gen_random_uuid(),
    "estado" TEXT NOT NULL,

    CONSTRAINT "estado_pago_pkey" PRIMARY KEY ("id_estado_pago")
);

-- CreateTable
CREATE TABLE "estado_suscripcion" (
    "id_estado_suscripcion" UUID NOT NULL DEFAULT gen_random_uuid(),
    "estado" TEXT NOT NULL,

    CONSTRAINT "estado_suscripcion_pkey" PRIMARY KEY ("id_estado_suscripcion")
);

-- CreateTable
CREATE TABLE "moneda" (
    "id_moneda" UUID NOT NULL DEFAULT gen_random_uuid(),
    "moneda" TEXT NOT NULL,

    CONSTRAINT "moneda_pkey" PRIMARY KEY ("id_moneda")
);

-- CreateTable
CREATE TABLE "rol" (
    "id_rol" UUID NOT NULL DEFAULT gen_random_uuid(),
    "rol" TEXT NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "tipo_contenido" (
    "id_tipo_contenido" UUID NOT NULL DEFAULT gen_random_uuid(),
    "descripcion" TEXT NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tipo_contenido_pkey" PRIMARY KEY ("id_tipo_contenido")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "fecha_alta" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activa" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "comunidad" (
    "id_comunidad" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "portada_url" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "descripcion" TEXT,
    "id_categoria_comunidad" UUID NOT NULL,

    CONSTRAINT "comunidad_pkey" PRIMARY KEY ("id_comunidad")
);

-- CreateTable
CREATE TABLE "contenido" (
    "id_contenido" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "orden" INTEGER NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url_contenido" TEXT,
    "duracion" INTEGER,
    "id_modulo" UUID NOT NULL,
    "id_tipo_contenido" UUID NOT NULL,

    CONSTRAINT "contenido_pkey" PRIMARY KEY ("id_contenido")
);

-- CreateTable
CREATE TABLE "curso" (
    "id_curso" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "imagen_url" TEXT,
    "certificado_habilitado" BOOLEAN NOT NULL DEFAULT false,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_comunidad" UUID NOT NULL,
    "id_dificultad" UUID NOT NULL,

    CONSTRAINT "curso_pkey" PRIMARY KEY ("id_curso")
);

-- CreateTable
CREATE TABLE "miembro_comunidad" (
    "id_usuario" UUID NOT NULL,
    "id_comunidad" UUID NOT NULL,
    "id_rol_comunidad" UUID NOT NULL,
    "fecha_ingreso" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMPTZ(6),

    CONSTRAINT "miembro_comunidad_pkey" PRIMARY KEY ("id_usuario","id_comunidad")
);

-- CreateTable
CREATE TABLE "modulo" (
    "id_modulo" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "orden" INTEGER NOT NULL,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "fecha_creacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_curso" UUID NOT NULL,

    CONSTRAINT "modulo_pkey" PRIMARY KEY ("id_modulo")
);

-- CreateTable
CREATE TABLE "nivel_dificultad" (
    "id_dificultad" UUID NOT NULL DEFAULT gen_random_uuid(),
    "dificultad" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "nivel_dificultad_pkey" PRIMARY KEY ("id_dificultad")
);

-- CreateTable
CREATE TABLE "pago" (
    "id_pago" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_suscripcion" UUID NOT NULL,
    "monto" DECIMAL(10,2) NOT NULL,
    "monto_neto" DECIMAL(10,2),
    "mp_payment_id" TEXT,
    "id_estado" UUID NOT NULL,
    "fecha_pago" TIMESTAMPTZ(6),
    "id_moneda" UUID NOT NULL,
    "mp_payload_respuesta" JSONB,
    "fecha_creacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMPTZ(6),
    "mp_payment_method_id" TEXT,
    "descripcion" TEXT,

    CONSTRAINT "pago_pkey" PRIMARY KEY ("id_pago")
);

-- CreateTable
CREATE TABLE "plan_comunidad" (
    "id_plan_comunidad" UUID NOT NULL DEFAULT gen_random_uuid(),
    "precio" DECIMAL(10,2) NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT,
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "mp_preapproval_plan_id" TEXT,
    "fecha_creacion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_modificacion" TIMESTAMPTZ(6),
    "id_comunidad" UUID NOT NULL,
    "id_ciclo_pago" UUID NOT NULL,
    "id_moneda" UUID NOT NULL,

    CONSTRAINT "plan_comunidad_pkey" PRIMARY KEY ("id_plan_comunidad")
);

-- CreateTable
CREATE TABLE "suscripcion" (
    "suscripcion_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "fecha_suscripcion" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_inicio" TIMESTAMPTZ(6),
    "fecha_fin" TIMESTAMPTZ(6),
    "external_reference" TEXT,
    "mp_subscription_id" TEXT,
    "init_point" TEXT,
    "fecha_actualizacion" TIMESTAMPTZ(6),
    "fecha_proximo_pago" TIMESTAMPTZ(6),
    "back_url" TEXT,
    "id_usuario" UUID NOT NULL,
    "id_plan_comunidad" UUID NOT NULL,
    "id_estado" UUID NOT NULL,

    CONSTRAINT "suscripcion_pkey" PRIMARY KEY ("suscripcion_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "comunidad_slug_key" ON "comunidad"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "pago_mp_payment_id_key" ON "pago"("mp_payment_id");

-- CreateIndex
CREATE UNIQUE INDEX "suscripcion_external_reference_key" ON "suscripcion"("external_reference");

-- CreateIndex
CREATE UNIQUE INDEX "suscripcion_mp_subscription_id_key" ON "suscripcion"("mp_subscription_id");

-- AddForeignKey
ALTER TABLE "comunidad" ADD CONSTRAINT "fk_comunidad_categoria" FOREIGN KEY ("id_categoria_comunidad") REFERENCES "categoria_comunidad"("id_categoria_comunidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contenido" ADD CONSTRAINT "fk_contenido_modulo" FOREIGN KEY ("id_modulo") REFERENCES "modulo"("id_modulo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contenido" ADD CONSTRAINT "fk_contenido_tipo" FOREIGN KEY ("id_tipo_contenido") REFERENCES "tipo_contenido"("id_tipo_contenido") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "fk_curso_comunidad" FOREIGN KEY ("id_comunidad") REFERENCES "comunidad"("id_comunidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "curso" ADD CONSTRAINT "fk_curso_nivel_dificultad" FOREIGN KEY ("id_dificultad") REFERENCES "nivel_dificultad"("id_dificultad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "miembro_comunidad" ADD CONSTRAINT "fk_miembro_comunidad" FOREIGN KEY ("id_comunidad") REFERENCES "comunidad"("id_comunidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "miembro_comunidad" ADD CONSTRAINT "fk_miembro_rol" FOREIGN KEY ("id_rol_comunidad") REFERENCES "rol"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "miembro_comunidad" ADD CONSTRAINT "fk_miembro_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modulo" ADD CONSTRAINT "fk_modulo_curso" FOREIGN KEY ("id_curso") REFERENCES "curso"("id_curso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "fk_pago_estado" FOREIGN KEY ("id_estado") REFERENCES "estado_pago"("id_estado_pago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "fk_pago_moneda" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id_moneda") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pago" ADD CONSTRAINT "fk_pago_suscripcion" FOREIGN KEY ("id_suscripcion") REFERENCES "suscripcion"("suscripcion_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plan_comunidad" ADD CONSTRAINT "fk_plan_comunidad_ciclo_pago" FOREIGN KEY ("id_ciclo_pago") REFERENCES "ciclo_pago"("id_ciclo_pago") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plan_comunidad" ADD CONSTRAINT "fk_plan_comunidad_comunidad" FOREIGN KEY ("id_comunidad") REFERENCES "comunidad"("id_comunidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "plan_comunidad" ADD CONSTRAINT "fk_plan_comunidad_moneda" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id_moneda") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suscripcion" ADD CONSTRAINT "fk_suscripcion_estado" FOREIGN KEY ("id_estado") REFERENCES "estado_suscripcion"("id_estado_suscripcion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suscripcion" ADD CONSTRAINT "fk_suscripcion_plan" FOREIGN KEY ("id_plan_comunidad") REFERENCES "plan_comunidad"("id_plan_comunidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suscripcion" ADD CONSTRAINT "fk_suscripcion_usuario" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
